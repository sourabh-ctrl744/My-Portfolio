#!/bin/bash
# Test script for debugging API issues

API_URL="http://portfolio-backend-env.eba-hbcrd6cy.ap-southeast-2.elasticbeanstalk.com"
FRONTEND_URL="http://portfolio-frontend-sourabh.s3-website-ap-southeast-2.amazonaws.com"

echo "🔍 Testing Backend API..."
echo ""

# Test 1: Health Check
echo "1️⃣ Testing Health Endpoint..."
echo "GET $API_URL/api/health"
curl -s -w "\nHTTP Status: %{http_code}\n" "$API_URL/api/health"
echo ""
echo ""

# Test 2: CORS Preflight
echo "2️⃣ Testing CORS Preflight (OPTIONS)..."
echo "OPTIONS $API_URL/api/messages"
curl -s -X OPTIONS "$API_URL/api/messages" \
  -H "Origin: $FRONTEND_URL" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  -v 2>&1 | grep -i "access-control"
echo ""
echo ""

# Test 3: POST Message (with CORS headers)
echo "3️⃣ Testing POST /api/messages..."
echo "POST $API_URL/api/messages"
RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X POST "$API_URL/api/messages" \
  -H "Origin: $FRONTEND_URL" \
  -H "Referer: $FRONTEND_URL/" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"name":"Sourabh Gupta","email":"guptasourabh744@gmail.com","subject":"Test","body":"Test message"}')

HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "HTTP Status: $HTTP_STATUS"
echo "Response Body:"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

# Test 4: Check CORS headers in response
echo "4️⃣ Checking CORS Headers..."
curl -s -I -X POST "$API_URL/api/messages" \
  -H "Origin: $FRONTEND_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","body":"test"}' \
  | grep -i "access-control"
echo ""

echo "✅ Tests complete!"
echo ""
echo "🔧 If tests fail, check:"
echo "   1. Backend health status in EB console"
echo "   2. CLIENT_ORIGIN environment variable in EB"
echo "   3. Database connection (check EB logs)"
echo "   4. Messages table exists (run migrations)"

