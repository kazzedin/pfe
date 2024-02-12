import React from 'react'

export default function Footer() {
  return (
    <div>
        <footer class="bg-gray-800 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
        <span>© <span id="currentYear"></span> Pfe à Distance. Tous droits réservés.</span>
        <a href="https://ent.usthb.dz/index.php/accueil" class="text-gray-400 hover:text-white">Visitez notre site partenaire</a>
    </div>
</footer>

<script>
    document.getElementById('currentYear').innerText = new Date().getFullYear();
</script>


    </div>
  )
}
