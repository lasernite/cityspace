import Text.Parsec
import Text.ParserCombinators.Parsec.Char
import Text.ParserCombinators.Parsec.Combinator
import Text.ParserCombinators.Parsec.Prim hiding (try)
import Control.Monad

data City = City { latitude :: Float, longitude :: Float, cityName :: String, stateName :: String }
	deriving (Eq, Show)

data CSValue = CString String | CFloat Float | CEmpty
	deriving (Eq, Show)

main = do
	codes <- readFile "zip_codes_states.csv"
	let csvData = (\(Right x) -> x) $ parse parseCSV "" codes
	let cityData = map (\(Just x) -> x) . filter (/= Nothing) . map getCity $ csvData
	print cityData
	print (length cityData)
	return ()
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