{-# LANGUAGE OverloadedStrings, ExtendedDefaultRules #-}

import Text.Parsec
import Text.ParserCombinators.Parsec.Char
import Text.ParserCombinators.Parsec.Combinator
import Text.ParserCombinators.Parsec.Prim hiding (try)
import Control.Monad
import Database.MongoDB
import Control.Monad.Trans (liftIO)

data City = City { latitude :: Float, longitude :: Float, cityName :: String, stateName :: String }
	deriving (Eq, Show)

data CSValue = CString String | CFloat Float | CEmpty
	deriving (Eq, Show)

main :: IO ()
main = do
	pipe <- runIOE $ connect (host "127.0.0.1")
	e <- access pipe master "citybase" run
	close pipe
	return ()

--run :: IO ()
run = do
	cities <- liftIO $ parseZips
	clearCities
	insertCities cities
	return ()

clearCities = delete (select [] "Cities")

insertCities = insertMany "Cities" . map (\(City lat long name state) -> ["geo" =: [long, lat], "name" =: name, "state" =: state])

parseZips :: IO [City]
parseZips = do
	codes <- readFile "zip_codes_states.csv"
	let csvData = (\(Right x) -> x) $ parse parseCSV "" codes
	let cityData = map (\(Just x) -> x) . filter (/= Nothing) . map getCity $ csvData
	return cityData
		where
			getCity [CString zipcode, CFloat lat, CFloat long, CString city, CString state, CString county] = Just $ City lat long city state
			getCity _ = Nothing

parseCSV :: Parser [[CSValue]]
parseCSV = sepBy ((try parseLine) <|> return []) newline
	where
		parseLine = sepBy parseCell (char ',')
		parseCell = do
			many (char ' ')
			contents <- (try parseString) <|> (try parseFloat) <|> (return CEmpty)
			many (char ' ')
			return contents
		parseString = do
			char '"'
			str <- manyTill (try anyChar) (char '"')
			return . CString $ str
		parseFloat = do
			sign <- option "" $ do
				sign' <- char '-' <|> char '+'
				if (sign' == '-') then (return "-") else (return "")
			value <- many1 (digit <|> char '.')
			return . CFloat . read $ value
