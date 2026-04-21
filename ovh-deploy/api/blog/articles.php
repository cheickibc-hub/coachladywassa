<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$articles = [
    ["id"=>"1","title"=>"7 techniques neurosciences pour gérer le stress sans médicaments","excerpt"=>"Découvrez comment votre cerveau peut naturellement réduire le cortisol.","category"=>"Gestion Stress","image_url"=>"https://images.pexels.com/photos/37079378/pexels-photo-37079378.jpeg?auto=compress&cs=tinysrgb&w=600","slug"=>"gerer-stress-neurosciences","reading_time"=>"6 min","date"=>"2025-12-15"],
    ["id"=>"2","title"=>"Comment vaincre la peur de présenter en public","excerpt"=>"La peur de parler en public touche 75% des gens.","category"=>"Performance","image_url"=>"https://images.pexels.com/photos/7793634/pexels-photo-7793634.jpeg?auto=compress&cs=tinysrgb&w=600","slug"=>"vaincre-peur-public","reading_time"=>"8 min","date"=>"2025-12-08"],
    ["id"=>"3","title"=>"Les 5 peurs que votre cerveau maintient","excerpt"=>"Votre amygdale est programmée pour vous protéger.","category"=>"Neurosciences","image_url"=>"https://images.pexels.com/photos/7792802/pexels-photo-7792802.jpeg?auto=compress&cs=tinysrgb&w=600","slug"=>"5-peurs-cerveau","reading_time"=>"7 min","date"=>"2025-12-01"],
    ["id"=>"4","title"=>"Neuroplasticité : pourquoi vous POUVEZ changer","excerpt"=>"La science prouve que votre cerveau peut se recâbler.","category"=>"Neuroplasticité","image_url"=>"https://images.unsplash.com/photo-1606471059439-2dfc9bbfb150?w=600","slug"=>"neuroplasticite-changer-peurs","reading_time"=>"5 min","date"=>"2025-11-24"],
    ["id"=>"5","title"=>"Focus naturel : 5 techniques pour la productivité","excerpt"=>"Optimisez votre concentration grâce aux neurosciences.","category"=>"Productivité","image_url"=>"https://images.pexels.com/photos/12912082/pexels-photo-12912082.jpeg?auto=compress&cs=tinysrgb&w=600","slug"=>"focus-naturel-productivite","reading_time"=>"6 min","date"=>"2025-11-17"],
    ["id"=>"6","title"=>"Cortisol élevé ? Votre cerveau vous maintient stressée","excerpt"=>"Comprendre le rôle du cortisol et le réguler.","category"=>"Gestion Stress","image_url"=>"https://images.unsplash.com/photo-1688120290962-30b22577b679?w=600","slug"=>"cortisol-stress-cerveau","reading_time"=>"7 min","date"=>"2025-11-10"]
];

echo json_encode($articles);
?>
