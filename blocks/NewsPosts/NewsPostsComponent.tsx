'use client'

import NewsItem from "@/components/news-postings/NewsItem"
import Pagination from "@/components/pagination/Pagination"
import RichText from "@/lexical-components/RichText"
import { NewsPostsBlock as NewsPostBlocksProps } from "@/payload-types"
import { useState } from "react"

export const NewsPostsBlock: React.FC<NewsPostBlocksProps> = (props) => {
    const { richText, posts, pagination, rowsPerPage } = props

    const [currentPage, setCurrentPage] = useState(1);

    let totalPages: number;
    let paginatedPosts: NewsPostBlocksProps["posts"];

    if (rowsPerPage) {
        totalPages = Math.ceil(posts.length / rowsPerPage);
        paginatedPosts = posts.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    } else {
        totalPages = 1;
        paginatedPosts = posts;
    }

    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    return (
        <div className="container my-16 sm:my-20">
            <div className="py-8 px-4 sm:px-6 rounded-xl bg-background/60 backdrop-blur-sm shadow-xl">
                <div>
                    {richText && <RichText data={richText} />}
                </div>

                {pagination ? (
                    <Pagination
                        pages={totalPages}
                        currentPage={currentPage}
                        rangeLabels={{ singular: 'Post', plural: 'Posts' }}
                        pageLength={rowsPerPage || posts.length}
                        totalCount={posts.length}
                        onPageChange={handlePageChange}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                    >
                        {paginatedPosts.map((post, index) => {
                            if (post.post && typeof post.post === 'object') {
                                return (
                                    <NewsItem
                                        key={post.post.id || index}
                                        newsPost={post.post}
                                    />
                                )
                            }
                            return null
                        })}
                    </Pagination>
                ) : (
                    <div>
                        {posts.map((post, index) => {
                            if (post.post && typeof post.post === 'object') {
                                return (
                                    <NewsItem
                                        key={post.post.id || index}
                                        newsPost={post.post}
                                    />
                                )
                            }
                            return null
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}