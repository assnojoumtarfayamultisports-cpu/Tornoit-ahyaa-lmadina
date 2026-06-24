 document.addEventListener("DOMContentLoaded", async () => {

  const SUPABASE_URL = "https://ipqvxnvsxpnqszmhbxgo.supabase.co";
  const SUPABASE_KEY = "ضع_هنا_المفتاح_العام";

  async function getMatches() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/matches?select=*`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    return await res.json();
  }

  const matches = await getMatches();

  let rows = "";

  matches.forEach(match => {
    rows += `
      <tr>
        <td>${match.match_date}</td>
        <td>${match.group_name}</td>
        <td>${match.team1} × ${match.team2}</td>
      </tr>
    `;
  });

  document.body.innerHTML = `
    <div class="header">
      <h1>بطولة أحياء المدينة لكرة القدم المصغرة 2026</h1>
    </div>

    <table border="1" width="100%">
      <thead>
        <tr>
          <th>التاريخ</th>
          <th>المجموعة</th>
          <th>المباراة</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
});
