$(document).ready(function(){
  var Player = new Instance();
  Player.level = 1;
  Player.experience = 0;
  Player.health = Player.level * 15;
  Player.damage = Player.level * 10;

  var Boss = new Instance();
  Boss.level = 1;
  Boss.health = Boss.level * 15;
  Boss.damage = Boss.level * 10;

  var currBossHealth = Boss.health;
  var currBossLevel = Boss.level;
  var currBossDamage = Boss.damage;

  var currPlayerHealth = Player.health;
  var currPlayerLevel = Player.level;
  var damage = Player.damage;

  function Instance(level, experience, health, damage){
      this.level = level;
      this.experience = experience;
      this.health = health;
      this.damage = damage;
      this.gameInterval = 0;
      this.battleState = false;
      this.checkPlayerAction = function(){
          $("#attack").on("click", function(){
              this.battleState = true;
              Player.playerAttack();
              Boss.bossAttack();
          });
      }
      this.playerAttack = function(damage){
        this.getStats();
        damage = Player.level * 5;
        if (damage >= 0 ){
          var newDamage = Math.floor((Math.random() * damage));
          damage = newDamage;
          currBossHealth -= damage;
          if(damage==0){
              $("#playerDmg").html("You Missed");
          }else if(damage>0){
              $("#playerDmg").html("You hit for: " + damage);
              $("#winner").html("");
          }
          if(currBossHealth<=0 ){
            alert("Player Wins!");
              Player.checkXp();
              Boss.bossPower();
              Player.inventory();
              this.newGame();
          }
          else if(currBossHealth<=0 && currPlayerHealth<=0){
              $("#winner").html("Tie Match!");
              this.newGame();
          }
        }
          this.gameInterval++;
      }
      this.bossAttack = function(npcDamage){
          npcDamage = currBossLevel * 5;
          if (npcDamage >= 0 ){
          var trueDamage = Math.floor((Math.random() * npcDamage));
          currPlayerHealth -= trueDamage;
          if(trueDamage==0){
              $("#bossDmg").html("Boss Missed" + "<br/>");
          }else if(trueDamage>0){
              $("#bossDmg").html("Boss hit you for: " + trueDamage  + "<br/>");
              $("#winner").html("");
          }
          if(currPlayerHealth<=0){
              alert("Boss Wins!");
              this.newGame();
          }
          else if(currBossHealth<=0 && currPlayerHealth<=0){
              $("#winner").html("Tie Match!");
              this.newGame();
          }
        }
      }
      this.getStats = function(){
          $("#playerHealth").html(currPlayerHealth);
          $("#playerLevel").html(currPlayerLevel);
          $("#bossLevel").html(currBossLevel);
          $("#bossHealth").html(currBossHealth);
      }
      this.checkXp = function(){
          Player.experience += 1;
          if(Player.experience > 0 * Player.level){
              Player.level++;
              currPlayerLevel++;
              Player.health = currPlayerLevel * 15;
          }
      }
      this.inventory = function(){
          var inventory = [];
          var itemList =
          ["Demon Blade",
          "Fate of darkness",
          "Exodia",
          "Scarred Secrect",
          "Ultimate Gift",
          "Franks Scent",
          "Tornados Breath",
          "Unstoppable Gist",
          "Daga"];
          var randomItem = Math.floor((Math.random() * itemList.length));
          inventory.push(itemList[randomItem]);
          for(var x = 0; x < inventory.length; x++){
              console.log(inventory[x]);
          }
          $(".slot").append(inventory + "<br/>");
      }
      this.bossPower = function(){
          currBossLevel++;
          Boss.health = currBossLevel * 15;
      }
      this.newGame = function(){
          currBossHealth = Boss.health;
          currPlayerHealth = Player.health;
      }
  }
  Player.checkPlayerAction();
});
