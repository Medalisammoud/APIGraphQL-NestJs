import { Query, Resolver } from "@nestjs/graphql";
import { ArticleService } from "../article.service";
import { Article } from "../models/article.model";

@Resolver(Article)
export class ArticleQueriesResolver {
    constructor(
        private readonly articleService: ArticleService,
    ){}

    @Query(() => [Article])
    async articleList(){
        return this.articleService.articleList();
    }
}