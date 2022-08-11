export const getJobs = async () => {
  try {
    const response = await fetch("https://www.zippia.com/api/jobs/", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json;charset=UTF-8",
      },
      method: 'POST',
      body: JSON.stringify({
        "fetchJobDesc": true,
        "title": "Business Analyst",
        "paidJobs": true,
        "dismissedListingHashes": [],
        "previousListingHashes": [],
        "numJobs": 20
      })
    });
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error fetching jobs");
  }
};