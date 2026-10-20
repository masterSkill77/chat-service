// Vérifie auprès de Laravel que deux utilisateurs sont amis confirmés (appel interne, token partagé)
const backendOrigin = new URL(process.env.AUTH_USER_URL).origin;

async function areFriends(userId, otherId) {
  const response = await fetch(`${backendOrigin}/api/internal/friendship/${userId}/${otherId}`, {
    headers: {
      "X-Internal-Token": process.env.INTERNAL_SERVICE_TOKEN || "",
      Accept: "application/json",
    },
  });
  if (!response.ok) return false;
  const body = await response.json();
  return body.friends === true;
}

module.exports = { areFriends };
