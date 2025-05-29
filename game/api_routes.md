# Player 
GET game/player/<player_name> -> retorna os dados do jogador 

GET game/player/floor<player_name> -> retorna as caracteristicas do andar atual do player 
GET game/player/floor/next/<player_name> -> avança um andar | retorna as configurações do andar 
GET game/player/floor/past/<player_name> -> retrocede um andar | retorna as configurações do andar

GET game/player/attack/<player_name> -> retorna os ataques do jogador
PUT game/player/attack/<player_name>/<attack_num> -> adiciona um ataque na posição selecionada e retorna todos os ataques
GET game/player/attack/gen/<player_name> -> retorna um ataque aleatorio de acordo com o andar maximo do jogador que o jogador não tenha

# Battle
GET game/battle/start/<player_name> -> gera e retorna um monstro na tabela do player com base no andar dele(se ja estiver em batalha só retorna o monstro)
GET game/battle/turn/<player_name> -> retorna um array com o status do monstro e do player

# Rank
GET game/rank/score -> retorna os dados de todos os player em ordem de score 
GET game/rank/floor -> retorna os dados de todos os player em ordem de andar 
GET game/rank/gold -> retorna os dados de todos os player em ordem de dinheiro 
GET game/rank/level -> retorna os dados de todos os player em ordem de level
GET game/rank/kills -> retorna os dados de todos os player em ordem de kills

