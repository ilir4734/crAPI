package models

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

//
type Comments struct {
	ID        string `gorm:"primary_key;auto_increment" json:"id"`
	Content   string `gorm:"size:255;not null;" json:"content"`
	CreatedAt time.Time
	Author    Author `json:"author"`
}

//CommentOnPost Add comment in post by id.
func CommentOnPost(client *mongo.Client, postComment Comments) (Post, error) {
	var comments Comments
	//Comments.Author = Prepare()
	//Take data from Database by postId
	preData, err := GetPostByID(client, postComment.ID)
	updatePost := preData
	if err != nil {
		log.Println(err)
	} else {
		comments.Content = postComment.Content
		comments.Author = Prepare()
		comments.CreatedAt = time.Now()
		//Add comment in post
		updatePost.Comments = append(updatePost.Comments, comments)

		update := bson.D{{"$set", bson.D{{"comments", updatePost.Comments}}}}

		collection := client.Database("crapi").Collection("post")

		_, err = collection.UpdateOne(context.TODO(), preData, update)
		if err != nil {
			log.Println(err)
		}
	}

	return updatePost, err
}
