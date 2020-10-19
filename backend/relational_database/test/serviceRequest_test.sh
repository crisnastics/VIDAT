server='localhost'
port='8080'
url="http://$server:$port"

echo "TEST CONSUMER API"
uri="/api/serviceRequest"
echo ""

echo "TEST CREATE ENDPOINT"
response=$(curl -X POST "$url$uri/create?id_demandant=1&id_offeror=1")
echo "$response"
response=$(curl -X POST "$url$uri/create?id_demandant=1&id_offeror=2")
echo "$response"
response=$(curl -X POST "$url$uri/create?id_demandant=2&id_offeror=1")
echo "$response"
response=$(curl -X POST "$url$uri/create?id_demandant=3&id_offeror=2")
echo "$response"
read -p "CHECK YOUR DATABASE, THEN HIT ENTER KEY"



echo "TEST DELETE ENDPOINT"
endpoint="/delete?id=3&id_demandant=2&id_offeror=1"
response=$(curl "$url$uri$endpoint")
echo "$endpoint"
echo "$response"
read -p "CHECK YOUR DATABASE, THEN HIT ENTER KEY"

echo "TEST UPDATE ENDPOINT"
endpoint="/update?id=4&id_demandant=3&id_offeror=2&service_cost=15000&service_status=0"
response=$(curl -X POST "$url$uri$endpoint")
echo "$endpoint"
echo "$response"

endpoint="/update?id=1&id_demandant=1&id_offeror=1&service_cost=20000&service_status=0"
response=$(curl -X POST "$url$uri$endpoint")
echo "$endpoint"
echo "$response"

endpoint="/update?id=2&id_demandant=1&id_offeror=2&service_date=01/01/2000+19:18:18&service_cost=15000"
response=$(curl -X POST "$url$uri$endpoint")
echo "$endpoint"
echo "$response"
read -p "CHECK YOUR DATABASE, THEN HIT ENTER KEY"

echo "TEST READ ALL ENDPOINT"
endpoint="/readAll"
response=$(curl "$url$uri$endpoint")
echo "$endpoint"
echo "$response"
read -p "CHECK YOUR DATABASE, THEN HIT ENTER KEY"

echo "TEST SEARCH BY ENDPOINT"
endpoint="/searchBy?service_cost=15000"
response=$(curl "$url$uri$endpoint")
echo "$endpoint"
echo "$response"
endpoint="/searchBy?id_demandant=1"
response=$(curl "$url$uri$endpoint")
echo "$endpoint"
echo "$response"