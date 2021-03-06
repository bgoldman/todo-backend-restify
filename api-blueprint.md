FORMAT: 1A

# Todo Backend API

Todos API is a todo storage backend for [TodoMVC](//todomvc.com).





# Group Todos



## Todo Collection [/todos]

### Create a Todo [POST]

The `completed` field will always be set as `false` for new Todo objects.

**Body Parameters**

Name  | Type    | Status   | Default
----- | ------- | -------- | -------
title | string  | required | *n/a*
order | boolean | optional | 1

**Returns**

A new Todo object.

+ Request Success (application/json)

            {
                "title": "dredd"
            }

+ Response 201 (application/json; charset=utf-8)

            {
                "id": 1,
                "title": "dredd",
                "completed": false,
                "order": 1,
                "url": "/todos/1"
            }



### List All Todos [GET]

**Returns**

A list of Todo objects in the order they were created.

+ Request Success (application/json)

+ Response 200 (application/json; charset=utf-8)

            [{
                "id": 1,
                "title": "dredd",
                "completed": false,
                "order": 1,
                "url": "/todos/1"
            }]



### Delete All Todos [DELETE]

All Todo objects will be deleted.
These Todo objects will no longer be returned by the API.

**Returns**

An empty array.

+ Request Success (application/json)

+ Response 200

            []



## Todo [/todos/{id}]

+ Parameters
    + id: `1` (integer) - The ID of the Todo

### Get a Todo [GET]

**Query Parameters**

Name | Type    | Status   | Default
---- | ------- | -------- | -------
id   | integer | required | *n/a*

**Returns**

The requested Todo object, or a 404 Not Found error.

+ Request Success (application/json)

+ Response 200 (application/json; charset=utf-8)

            {
                "id": 1,
                "title": "dredd",
                "completed": false,
                "order": 1,
                "url": "/todos/1"
            }

+ Request Failure: Not Found (application/json)

+ Response 404 (application/json; charset=utf-8)

            {
                "code": "NotFoundError",
                "message": "Todo not found."
            }



### Update a Todo [PATCH]

**Query Parameters**

Name | Type    | Status   | Default
---- | ------- | -------- | -------
id   | integer | required | *n/a*

**Body Parameters**

Name      | Type    | Status   | Default
--------- | ------- | -------- | -------
title     | string  | optional | *n/a*
completed | boolean | optional | false
order     | boolean | optional | 1

**Returns**

The updated Todo object, or a 404 Not Found error.

+ Request Success (application/json)

            {
                "title": "dredd",
                "completed": true,
                "order": 1,
                "url": "/todos/1"
            }

+ Response 200 (application/json; charset=utf-8)

            {
                "id": 1,
                "title": "dredd",
                "completed": true,
                "order": 1,
                "url": "/todos/1"
            }

+ Request Failure: Not Found (application/json)

+ Response 404 (application/json; charset=utf-8)

            {
                "code": "NotFoundError",
                "message": "Todo not found."
            }



### Delete a Todo [DELETE]

**Query Parameters**

Name | Type    | Status   | Default
---- | ------- | -------- | -------
id   | integer | required | *n/a*

**Returns**

The null value, or a 404 Not Found error.

+ Request Success (application/json)

+ Response 204

+ Request Failure: Not Found (application/json)

+ Response 404 (application/json; charset=utf-8)

            {
                "code": "NotFoundError",
                "message": "Todo not found."
            }
