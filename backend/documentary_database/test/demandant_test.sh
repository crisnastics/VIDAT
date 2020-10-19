server='localhost'
port='8081'
url="http://$server:$port"

echo "TEST DEMANDANT API"
uri="/api/demandant"
echo ""

echo "TEST CREATE ENDPOINT"
endpoint="/create?id=1"
response=$(curl -X POST "$url$uri$endpoint")
echo "$endpoint"
echo "$response"

endpoint="/create?id=2"
response=$(curl -X POST "$url$uri$endpoint")
echo "$endpoint"
echo "$response"

echo "TEST ADD PHOTO ENDPOINT"
endpoint="/addPhoto?id=1&photoPath=path/to/photo1"
response=$(curl -X POST "$url$uri$endpoint")
echo "$endpoint"
echo "$response"

endpoint="/addPhoto?id=1&photoPath=path/to/photo2"
response=$(curl -X POST "$url$uri$endpoint")
echo "$endpoint"
echo "$response"

endpoint="/addPhoto?id=1&photoPath=path/to/photo3"
response=$(curl -X POST "$url$uri$endpoint")
echo "$endpoint"
echo "$response"
read -p "CHECK YOUR DATABASE, THEN HIT ENTER KEY"

echo "TEST REMOVE PHOTO ENDPOINT"
endpoint="/removePhoto?id=1&photoPath=path/to/photo1"
response=$(curl -X POST "$url$uri$endpoint")
echo "$endpoint"
echo "$response"