AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");
            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });
            enemyBullet.setAttribute("material", "color", "#282B29");
            var position = els[i].getAttribute("position")
            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var position1 = new THREE.Vector3();
            var enemy = els[i].object3D
            var player = document.querySelector("#weapon").object3D
            player.getWorldDirection(position1);
            var position2 = new THREE.Vector3();
            enemy.getWorldDirection(position2);

            //Get enemey and player position using Three.js methods
            var direction = new THREE.Vector3()
            direction.subVectors(position1, position2).normalize()

            //set the velocity and it's direction
            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10))
            //Set dynamic-body attribute
            enemyBullet.setAttribute("dymanic-body", {shape: "sphere", mass: "0"})

            //Get text attribute
            var playerLife = parseInt(document.querySelector("#countLife").getAttribute("text").value)

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if (playerLife > 0){
                            playerLife -= 1
                            document.querySelector("#countLife").setAttribute("text", {value: playerLife})
                    }

                    if (playerLife <= 0) { 
                        var txt = document.querySelector("#over"); 
                        txt.setAttribute("visible", true); 
                        //remove tanks 
                        var tankEl = document.querySelectorAll(".enemy") 
                        for (var i = 0; i < tankEl.length; i++) 
                        {
                            scene.removeChild(tankEl[i])
                        }
                    }
                }
            });

        }
    },

});