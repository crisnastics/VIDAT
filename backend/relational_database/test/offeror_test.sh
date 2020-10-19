server='localhost'
port='8080'
url="http://$server:$port"

echo "TEST CONSUMER API"
uri="/api/offeror"
echo ""

echo "TEST CREATE ENDPOINT"
response=$(curl -X POST "$url$uri/create?email=email1@somedomain.com&password=secretpassword")
echo "$response"
response=$(curl -X POST "$url$uri/create?email=email2@somedomain.com&password=secretpassword")
echo "$response"
response=$(curl -X POST "$url$uri/create?email=email3@somedomain.com&password=secretpassword")
echo "$response"
response=$(curl -X POST "$url$uri/create?email=email4@somedomain.com&password=secretpassword")
echo "$response"
read -p "CHECK YOUR DATABASE, THEN HIT ENTER KEY"

echo "TEST READ ALL ENDPOINT"
response=$(curl "$url$uri/readAll")
echo "$response"

echo "TEST READ ONE ENDPOINT"
response=$(curl "$url$uri/readOne?id=1")
echo "$response"
response=$(curl "$url$uri/readOne?id=2")
echo "$response"
response=$(curl "$url$uri/readOne?id=3")
echo "$response"

echo "TEST UPDATE ENDPOINT"
response=$(curl -X POST "$url$uri/update?id=1&phone=phone+1&name=name+1&address=address+1&rut=rut+1")
echo "$response"
response=$(curl -X POST "$url$uri/update?id=2&phone=phone+1&name=name+1&address=address+2&rut=rut+2")
echo "$response"
response=$(curl -X POST "$url$uri/update?id=3&phone=phone+1&name=name+3&address=address+2&rut=rut+3")
echo "$response"
read -p "CHECK YOUR DATABASE, THEN HIT ENTER KEY"

echo "TEST DELETE ENDPOINT"
response=$(curl "$url$uri/delete?id=4")
echo "$response"

echo "TEST SEARCH BY ENDPOINT"
response=$(curl "$url$uri/searchBy?phone=phone+1")
echo "$response"
response=$(curl "$url$uri/searchBy?name=name+1")
echo "$response"
response=$(curl "$url$uri/searchBy?address=address+1")
echo "$response"