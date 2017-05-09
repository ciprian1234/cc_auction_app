/***************************BACKEND API****************************/
--------------------------------------------------------------------
GET /api/users - returneaza toti userii
--------------------------------------------------------------------
GET /api/users/username - returneaza userul cu 'username'
--------------------------------------------------------------------
GET /api/users/:username/items - returneaza itemurile unui user
--------------------------------------------------------------------
GET /api/users/:username/bids - returneaza bid-urile unui user
--------------------------------------------------------------------
POST /api/users - inregistreaza userul in baza de date
{
    "username": "username",
    "firstname": "prenume",
    "lastname": "nume",
    "gender": "male/female",
    "address": "adresa",
    "country": "Romania",
    "city": "Iasi",
    "email": "email@gmail.com",
    "contact": "07400000000",
    "password": "1234",
    "type": "user/moderator/admin"
}
IMPORTANT: In caz de eroare returneaza: {error: "Username already taken."}
--------------------------------------------------------------------
GET /api/items - returneaza lista completa de items
--------------------------------------------------------------------
GET /api/items/:item_id - returneaza un item
--------------------------------------------------------------------
GET /api/categories - returneaza lista de categorii existente
--------------------------------------------------------------------
GET /api/items/:item_id/bids - returneaza toate bidurile unui item
--------------------------------------------------------------------
GET /api/items/categories/:category_id - returneaza toate itemurile dintr-o categorie
--------------------------------------------------------------------
POST /api/items - posteaza un item

body:
{
	"category_id": 3,
	"username": "ciprian123",
	"item_name": "laptop 1",
	"item_description": "best laptop1 ever",
	"min_bid_price": 500,
	"status": "active",
	"photo": "",
	"start_date": "2020-05-10", - ESTE OPTIONAL, daca vrei ca licitatia sa porneasca mai tarziu
	"end_date": "2021-05-20"
}

Ar Trebui implemenate in caz de eroare:
{error: "Category does not exist."}
{error: "You are not logged in"}
--------------------------------------------------------------------
POST /api/items/bids - liciteaza pentru un item
{
	"item_id": 1,
	"username": "ciprian123",
	"bid_price": 999,
	"message": "optional"
}
--------------------------------------------------------------------