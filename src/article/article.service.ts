import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortDirection } from 'src/pagination/dto/pagination.dto';
import { Repository } from 'typeorm';
import { ArticleCreateInput, ArticleCreateOutput } from './dto/article.create.dto';
import { ArticleDeleteOutput } from './dto/article.delete.dto';
import { ArticlesPagination, ArticlesPaginationArgs } from './dto/article.pagination.dto';
import { ArticleUpdateInput, ArticleUpdateOutput } from './dto/article.update.dto';
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
constructor(
@InjectRepository(Article)
private readonly articleRepository: Repository<Article>
){}
    async articleCreate (input: ArticleCreateInput): Promise<ArticleCreateOutput> {
        const newArticle = this.articleRepository.create(input);
        const article = await this.articleRepository.save(newArticle);
        return { article };
    }

    async articleUpdate (articleId: Article['id'],
        input: ArticleUpdateInput): Promise<ArticleUpdateOutput> {
        const article = await this.articleRepository.findOneOrFail(articleId);
        article.title= input.title;
        article.description= input.description;
        article.image = input.image;
        await article.save();
        return { article };
    }

    async articleDelete (articleId: Article['id']):
        Promise<ArticleDeleteOutput> {
        const article = await this.articleRepository.findOneOrFail(articleId);
        await article.remove();
        return { articleId };
    }

    async articlesPagination(args: ArticlesPaginationArgs): Promise<ArticlesPagination>{
        const [nodes, totalCount] = await this.articleRepository.findAndCount({
            skip: args.skip,
            take: args.take,
            order: {
                createdAt: args.sortBy?.createdAt === SortDirection.ASC? 'ASC' : 'DESC'
            }
        });
        return { nodes, totalCount }
    }
}
