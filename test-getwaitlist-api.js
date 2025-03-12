// A simple script to test your GetWaitlist API credentials
const testGetWaitlistAPI = async () => {
  const GETWAITLIST_API_KEY = "24fd5ce5ef94efb303b62e8b5a44abc18e2d5324e6198b004068a4ca0759ccdb"
  const GETWAITLIST_LIST_ID = "26115"

  try {
    // Using the correct endpoint format according to GetWaitlist documentation
    const endpoint = `https://waitlist.getwaitlist.com/api/v1/lists/${GETWAITLIST_LIST_ID}/waiters`

    console.log(`Testing API with endpoint: ${endpoint}`)

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        api_key: GETWAITLIST_API_KEY,
        source: "api_test",
      }),
    })

    // Log the raw response for debugging
    const responseText = await response.text()
    console.log("Raw API response:", responseText)

    // Try to parse as JSON if possible
    try {
      const data = JSON.parse(responseText)
      console.log("API Response (parsed):", data)
    } catch (e) {
      console.log("Response is not valid JSON")
    }

    console.log("Status:", response.status)

    if (!response.ok) {
      console.error("Error status code:", response.status)
    }
  } catch (error) {
    console.error("Fetch error:", error)
  }
}

// Run the test
testGetWaitlistAPI()

