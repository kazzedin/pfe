import React from 'react'

export default function Footer() {
  return (
    <div>
        <footer className="bg-gray-800 bg-opacity-50 text-white py-4">
    <div className=" mx-auto flex justify-between items-center">
        <span>© <span id="currentYear"></span> Pfe à Distance. Tous droits réservés.</span>
        <a href="https://ent.usthb.dz/index.php/accueil" className="text-gray-400 hover:text-blue-500">Site ent USTHB</a>
    </div>
</footer>

<script>
    document.getElementById('currentYear').innerText = new Date().getFullYear();
</script>


    </div>
  )
}
