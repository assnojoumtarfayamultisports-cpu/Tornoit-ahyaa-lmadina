 const SUPABASE_URL = "https://ipqvxnvsxpnqszmhbxgo.supabase.co";
const SUPABASE_KEY = "sb_publishable_bv249Hzw8qug45r_B5lspw_CN-mdaLK";

async function loadMatches() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/matches?select=*&order=match_date.asc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const matches = await response.json();

    const tbody = document.getElementById("matches-body");

    if (!tbody) {
      console.error("matches-body not found");
      return;
    }

    tbody.innerHTML = "";

    const days = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت"
    ];

    matches.forEach(match => {
      const dateObj = new Date(match.match_date);

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${days[dateObj.getDay()]}</td>
        <td>${match.match_date}</td>
        <td>${match.group_name}</td>
        <td>${match.team1} × ${match.team2}</td>
      `;

      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error(error);
  }
}

loadMatches();
