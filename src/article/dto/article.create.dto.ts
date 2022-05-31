import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Article } from "../models/article.model";

@InputType ()
export class ArticleCreateInput {
    @Field(() => String)
    title: String;

    @Field(() => String)
    description: String;

    @Field(() => String)
    image: String;
}

@ObjectType()
export class ArticleCreateOutput {
    @Field (() => Article)
    article: Article;
}