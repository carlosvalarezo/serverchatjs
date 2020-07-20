use chat

db.createCollection("users")
db.createCollection("messages")
db.createCollection("chatroom")

db.users.insert([{"name" : "Saartje Kara", "email" : "saartje.kara@example.com", "password" : "$2a$10$EUAgzYoHUaZDlMk06FcenecTiXXuJDUf/gavUWVadjWixOCQlexdS", "avatar" : "//www.gravatar.com/avatar/974d1dd06e373b06a06db393b28b8b39?s=200&r=pg&d=mm"},
{"name" : "Kelly Wells", "email" : "kelly.wells@example.com", "password" : "$2a$10$EUAgzYoHUaZDlMk06FcenecTiXXuJDUf/gavUWVadjWixOCQlexdS", "avatar" : "//www.gravatar.com/avatar/e854201aba1fdc10259c93657381fb17?s=200&r=pg&d=mm"},
{"name" : "Cameron Turner", "email" : "cameron.turner@example.com", "password" : "$2a$10$EUAgzYoHUaZDlMk06FcenecTiXXuJDUf/gavUWVadjWixOCQlexdS", "avatar" : "//www.gravatar.com/avatar/b524aa0d87aea81084514e52461b5c6c?s=200&r=pg&d=mm"},
{"name" : "Adrian Ramirez", "email" : "adrian.ramirez@example.com", "password" : "$2a$10$EUAgzYoHUaZDlMk06FcenecTiXXuJDUf/gavUWVadjWixOCQlexdS", "avatar" : "//www.gravatar.com/avatar/088c8a2ab31ea2419f1057ee75cbba9f?s=200&r=pg&d=mm"},
{"name" : "Alvina Nogueira", "email" : "alvina.nogueira@example.com", "password" : "$2a$10$EUAgzYoHUaZDlMk06FcenecTiXXuJDUf/gavUWVadjWixOCQlexdS", "avatar" : "//www.gravatar.com/avatar/3a7d1cc374ae0dd1037fbaaba1e23ba1?s=200&r=pg&d=mm"}])

db.chatroom.insert({"name":"default-chatroom"})
