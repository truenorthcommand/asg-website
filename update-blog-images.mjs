import { initializeDatabase, db } from './server/_core/db.ts';
import { blogPosts } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';

const imageUpdates = [
  {
    slug: 'why-emergencies-happen-at-2am',
    featuredImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663393258417/gVGt3GVaioQVft9gFJLtBK/blog-hero-emergency-prevention-KFEzs9Eom7vZguDP7K5PUk.webp',
  },
  {
    slug: 'reactive-vs-proactive-maintenance',
    featuredImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663393258417/gVGt3GVaioQVft9gFJLtBK/blog-hero-reactive-proactive-B88kyzz7353fH6Vc7K9xSb.webp',
  },
  {
    slug: 'compliance-safety-standards',
    featuredImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663393258417/gVGt3GVaioQVft9gFJLtBK/blog-hero-compliance-standards-Dx4vCcQhgybwSnhpiufhoh.webp',
  },
  {
    slug: 'emergency-response-leak-case-study',
    featuredImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663393258417/gVGt3GVaioQVft9gFJLtBK/blog-hero-case-study-eL9isKLR6fc375VzsEwRw5.webp',
  },
];

async function updateBlogImages() {
  try {
    console.log('Initializing database...');
    await initializeDatabase();
    
    console.log('Updating blog post images...');
    
    for (const update of imageUpdates) {
      await db
        .update(blogPosts)
        .set({ featuredImage: update.featuredImage })
        .where(eq(blogPosts.slug, update.slug));
      console.log(`✓ Updated: ${update.slug}`);
    }
    
    console.log('\n✅ All blog post images updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating blog images:', error);
    process.exit(1);
  }
}

updateBlogImages();
