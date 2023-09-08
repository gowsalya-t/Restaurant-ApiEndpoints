Page 1
-----------------------------------


List of city/locations

http://localhost:5000/locationList

List of QuickSearch/mealTypes

http://localhost:5000/QuickSearch

List of restaurants

http://localhost:5000/RestaurantData

restaurant wrt city 

http://localhost:5000/RestaurantData?state_id=1

page2
----------------

restaurant wrt meal type

http://localhost:5000/RestaurantData?mealId=1

restaurant wrt meal type and cuisine id

http://localhost:5000/filter/1?cuisineId=1

restaurant wrt meal type and amt cost   

http://localhost:5000/filter/2?lcost=300&hcost=500

restaurant wrt meal type and amt cost and sorting

http://localhost:5000/filter/2?lcost=300&hcost=500&sort=1

page 3
-------------

restaurant details

http://localhost:5000/details/2

restaurant menu

http://localhost:5000/menu/2

Page 4
---------------

Menu Details 

(POST) http://localhost:5000/menuItem

PlaceOrder (POST)

http://localhost:5000/ordersPlaced

Page 5
---------------

List of orders

http://localhost:5000/orders

List of orders wrt to email

http://localhost:5000/orders?email=jack@gmail.com

Update payment details (PUT)

http://localhost:5000/updateOrder/2

delete orders (DELETE)

http://localhost:5000/orders