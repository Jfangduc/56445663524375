"use server"

export async function submitWaitlistEmail(email: string) {
  // Your GetWaitlist.com credentials
  const GETWAITLIST_API_KEY = "24fd5ce5ef94efb303b62e8b5a44abc18e2d5324e6198b004068a4ca0759ccdb"
  const GETWAITLIST_LIST_ID = "26115"

  try {
    // Updated to the correct API endpoint
    const endpoint = "https://api.getwaitlist.com/api/v1/waitlist/submit"

    // Updated request body structure according to current API docs
    const requestBody = {
      email: email,
      api_key: GETWAITLIST_API_KEY,
      waitlist_id: GETWAITLIST_LIST_ID,
      referral_source: "website_form"
    }

    console.log("Submitting to endpoint:", endpoint)
    console.log("With request body:", JSON.stringify(requestBody))

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    // Log the raw response for debugging
    const responseText = await response.text()
    console.log("Raw API response:", responseText)

    // Parse the response if it's JSON
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error("Failed to parse response as JSON:", e)
      throw new Error("Invalid response from waitlist API")
    }

    // Check if the request was successful
    if (!response.ok) {
      console.error("GetWaitlist API error:", data)
      throw new Error(data.message || "Failed to submit to waitlist")
    }

    // Return the successful response
    return {
      success: true,
      referralLink: data.referral_link || null,
      position: data.position || null,
      waiterId: data.id || null,
    }
  } catch (err: any) {
    // Enhanced error logging
    console.error("Error submitting to GetWaitlist:", {
      message: err.message,
      stack: err.stack,
    })

    throw new Error(`Failed to submit email: ${err.message}`)
  }
}

