// In our test database, we'll need the following users:
/*
1. A user who is authorized to draw a gift exchange with no errors.
2. A user who is authorized to draw a gift exchange but has already drawn.
3. A user who is authorized to draw a gift exchange but doesn't have at least 3 members.

We also need to test:
1. When the exchangeId doesn't exist in the database.
2. Database failures. 
3. If the user doesn't exist. 
4. If the user is not authorized to draw the gift exchange (not the owner)