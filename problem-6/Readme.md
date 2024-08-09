# Scoreboard API Module

## Overview

This module is responsible for handling the updates of user scores on a scoreboard, ensuring that the top 10 scores are displayed in real-time on the website. The module contains wrapper for action apis to update users score, api to get top 10 users by score and socket emiter for real time updates. Security measures are in place to prevent unauthorized score updates.

## Features

1. **Live Scoreboard Updates**: The module supports real-time updates of the top 10 user scores on the scoreboard.
2. **Secure Score Update**: Only authorized score update requests are processed to prevent malicious activities.
3. **Efficient Data Handling**: The module ensures that only relevant scores (i.e., those potentially affecting the top 10) are processed for updating the scoreboard.

## API Endpoints

### 1. Update score wrapper
- **Description**: Wrapper which wraps the endpoint after completion of which it is necessary to update the user's score.
- **Example of implementation**:
  ```ts
    import { Response, NextFunction } from "express";
    
    import { updateUserScore, handleUpdateScoreError } from '@score/score.service';
    import { AuthenticatedRequest } from "...";
    import { authGuard } from "...";
    import { errorLogger } from '...';
  
    export const updateUserScoreWrapper = async (
      targetMethod: (
        req: AuthenticatedRequest,
        res: Response,  
        next: NextFunction
        ) => Promise<void>,
      scoreType: ScoreType
    ) => {
        return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
          // If user is not authorized, the function will throw error "Unauthorized" 
          await authGuard(req.headers.authorization);
    
              // Try to execute the target method. If the method fails, "updateUserScore" will not be executed.
              // If "updateUserScore" fails, continue flow and catching error without throwing
          try {
                await targetMethod(req, res, next);
    
                // In case the system is highly loaded, it is recommended to use a message broker to send a command to add score to this user.
                updateUserScore(req.user, scoreType).then().catch(handleUpdateScoreError);
          } catch (error) {
                errorLogger(error);
                  
                next(error);    
              }
          }
      };
     ```
- **Example of usage**:
  ```ts
    ...
  
    app.post('/action', updateUserScoreWrapper(someAction, scoreType.ACTION_1));
  
    app.get('/score/top-ten', getToTenUsers);
  
    ...
  ```

### 2. `GET /api/score/top-ten`
- **Description**: Retrieves the current top 10 scores. 
- **Response**:
    - **200 OK**: Current top 10 scores.
      ```json
      {
        "top_10_scores": [
          {"user": { "id":  "integer", "username": "string" ...}, "score": "integer"},
          ...
        ]
      }
      ```

### 2. Socket emitter
- **Description**: To update the table with the top 10 users in real time, you need to use sockets. Implementation can be found on [the official site](https://socket.io/docs/v4/server-api/)

## Flow of Execution

1. **User Action**: The user performs an action on the website.
2. **API Call**: The frontend sends a request to the action endpoint with the necessary data.
3. **Authentication & Authorization**: The Wrapper validates the request by checking the authenticity of the user and the action performed.
4. **Score Update**: If the request is authorized, the user's score is updated after endpoint execution.
5. **Top 10 Scores**: The system checks if the updated score affects the top 10. If so, it recalculates and returns the new top 10 list.
6. **Real-Time Update**: The updated top 10 list is sent back to the frontend for live updating on the scoreboard.

### Diagram
The project structure diagram can be found by [the link](https://drive.google.com/file/d/1OdN4uSve2a9EYzZBYwl3GqCP61dAdeYQ/view?usp=sharing) or in the file "problem-6-architecture.drawio" (must be opened in [draw.io](https://app.diagrams.net/))



## Security Considerations

1. **Authentication**: Ensure that the user is authenticated before allowing access to score update middleware.
2. **Authorization**: Validate that the action associated with the score update is legitimate (e.g., by using a secure token or signature).
3. **Throttling/Rate limit**: Implement throttling or rate limiting mechanism to prevent brute-force attempts to increase scores.


## Improvements

1. **Caching**: Implement caching for the top 10 scores to reduce the load on the database.
