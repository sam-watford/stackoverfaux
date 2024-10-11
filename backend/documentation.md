<a name="top"></a>
# Acme project v0.0.0

REST Api

# Table of contents

- [Answers](#Answers)
  - [Add a new answer](#Add-a-new-answer)
  - [Delete an answer](#Delete-an-answer)
  - [Retrieve a specific answer with comments](#Retrieve-a-specific-answer-with-comments)
- [Auth](#Auth)
  - [Log in with username](#Log-in-with-username)
  - [Register a new user](#Register-a-new-user)
- [Comments](#Comments)
  - [Add a new comment](#Add-a-new-comment)
- [Questions](#Questions)
  - [Create a new question](#Create-a-new-question)
  - [Retrieve a specific question](#Retrieve-a-specific-question)
  - [Retrieve all questions](#Retrieve-all-questions)
- [Users](#Users)
  - [Retrieve a specific user by id](#Retrieve-a-specific-user-by-id)
  - [Retrieve all users](#Retrieve-all-users)

___


# <a name='Answers'></a> Answers

## <a name='Add-a-new-answer'></a> Add a new answer
[Back to top](#top)

```
POST /answers
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| body | `String` | <p>Answer body.</p> |
| questionId | `Number` | <p>Question ID that the answer belongs to.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| answer | `Object` | <p>Newly created answer.</p> |

### Error response

#### Error response - `400`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| message | `String` | <p>Body and questionId are required.</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while creating the answer.</p> |

## <a name='Delete-an-answer'></a> Delete an answer
[Back to top](#top)

```
DELETE /answers/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Answer's unique ID.</p> |

### Error response

#### Error response - `403`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| message | `String` | <p>You are not authorized to delete this answer.</p> |

#### Error response - `404`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| message | `String` | <p>Answer not found.</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while deleting the answer.</p> |

## <a name='Retrieve-a-specific-answer-with-comments'></a> Retrieve a specific answer with comments
[Back to top](#top)

```
GET /answers/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Answer's unique ID.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| answer | `Object` | <p>Answer object.</p> |
| answer.userName | `String` | <p>The name of the user who posted the answer.</p> |

### Error response

#### Error response - `404`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| message | `String` | <p>Answer not found.</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while retrieving the answer.</p> |

# <a name='Auth'></a> Auth

## <a name='Log-in-with-username'></a> Log in with username
[Back to top](#top)

```
POST /auth/login
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | <p>Username.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>JWT token for the user.</p> |

### Error response

#### Error response - `400`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| message | `String` | <p>Invalid username.</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while logging in.</p> |

## <a name='Register-a-new-user'></a> Register a new user
[Back to top](#top)

```
POST /auth/register
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | <p>Username.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>JWT token for the user.</p> |

### Error response

#### Error response - `400`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| message | `String` | <p>User already exists.</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while registering user.</p> |

# <a name='Comments'></a> Comments

## <a name='Add-a-new-comment'></a> Add a new comment
[Back to top](#top)

```
POST /comments
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| body | `String` | <p>Comment body.</p> |
| questionId | `Number` | **optional** <p>Question ID (optional if comment is for a question).</p> |
| answerId | `Number` | **optional** <p>Answer ID (optional if comment is for an answer).</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| comment | `Object` | <p>Newly created comment.</p> |
| comment.id | `Number` | <p>Comment id.</p> |
| comment.body | `String` | <p>Comment body.</p> |

### Error response

#### Error response - `400`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| message | `String` | <p>Body and either questionId or answerId are required.</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while creating the comment.</p> |

# <a name='Questions'></a> Questions

## <a name='Create-a-new-question'></a> Create a new question
[Back to top](#top)

```
POST /questions
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| title | `String` | <p>Question title.</p> |
| body | `String` | <p>Question body.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| question | `Object` | <p>Newly created question.</p> |
| question.id | `Number` | <p>Question id.</p> |
| question.title | `String` | <p>Question title.</p> |
| question.body | `String` | <p>Question body.</p> |
| question.score | `Number` | <p>Question score.</p> |

### Error response

#### Error response - `400`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| message | `String` | <p>Title and body are required.</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while creating the question.</p> |

## <a name='Retrieve-a-specific-question'></a> Retrieve a specific question
[Back to top](#top)

```
GET /questions/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Question's unique ID.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Question id.</p> |
| title | `String` | <p>Question title.</p> |
| body | `String` | <p>Question body.</p> |
| userName | `String` | <p>The name of the user who posted the question.</p> |

### Error response

#### Error response - `404`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| message | `String` | <p>Question not found.</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while retrieving the question.</p> |

## <a name='Retrieve-all-questions'></a> Retrieve all questions
[Back to top](#top)

```
GET /questions
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| questions | `Object[]` | <p>List of questions.</p> |
| questions.id | `Number` | <p>Question id.</p> |
| questions.title | `String` | <p>Question title.</p> |
| questions.body | `String` | <p>Question body.</p> |
| questions.score | `Number` | <p>Question score.</p> |

### Error response

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while retrieving questions.</p> |

# <a name='Users'></a> Users

## <a name='Retrieve-a-specific-user-by-id'></a> Retrieve a specific user by id
[Back to top](#top)

```
GET /users/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>User's unique ID.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>User id.</p> |
| name | `String` | <p>Username.</p> |

### Error response

#### Error response - `404`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| message | `String` | <p>User not found.</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while retrieving the user.</p> |

## <a name='Retrieve-all-users'></a> Retrieve all users
[Back to top](#top)

```
GET /users
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| users | `Object[]` | <p>List of users.</p> |
| users.id | `Number` | <p>User id.</p> |
| users.name | `String` | <p>Username.</p> |

### Error response

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error | `String` | <p>Server error while retrieving users.</p> |

