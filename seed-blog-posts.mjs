import { initializeDatabase, db } from './server/_core/db.ts';
import { blogPosts } from './drizzle/schema.ts';

const posts = [
  {
    title: 'Why Property Maintenance Emergencies Happen at 2 AM (And How to Prevent Them)',
    slug: 'why-emergencies-happen-at-2am',
    excerpt: 'Learn why 70% of emergency repairs could have been prevented with basic maintenance, and discover practical prevention strategies.',
    category: 'maintenance',
    featuredImage: 'https://cdn.adaptservicesgroup.co.uk/blog/emergency-prevention.jpg',
    metaDescription: 'Prevent emergency property repairs. Learn why 70% of emergencies could be avoided with basic maintenance.',
    readTime: 6,
    author: 'Human',
    status: 'published',
    publishDate: new Date(),
    content: 'Why Property Maintenance Emergencies Happen at 2 AM (And How to Prevent Them)\n\nIt\'s 2 AM on a Sunday. Your tenant calls. There\'s water pouring from the ceiling. The boiler has failed. A pipe has burst in the loft. You\'re now facing a choice: pay an emergency callout fee (often £300–£500 for after-hours work) or let the damage accumulate until Monday morning.\n\nThe cost of waiting is higher than the cost of fixing it now.\n\nMost property owners don\'t realize that 70% of emergency repairs could have been prevented with basic maintenance. A burst pipe doesn\'t happen overnight—it\'s the result of months of pressure, corrosion, or poor insulation. A boiler breakdown usually shows warning signs weeks in advance: strange noises, pilot light issues, reduced heating.',
  },
  {
    title: 'The Hidden Cost of Reactive vs. Proactive Property Maintenance',
    slug: 'reactive-vs-proactive-maintenance',
    excerpt: 'Discover why reactive maintenance costs 3-4x more than proactive maintenance over 5 years, and how to switch strategies.',
    category: 'maintenance',
    featuredImage: 'https://cdn.adaptservicesgroup.co.uk/blog/reactive-proactive.jpg',
    metaDescription: 'Reactive vs proactive maintenance: Why proactive costs 75% less over 5 years. ROI analysis and practical guide.',
    readTime: 7,
    author: 'Human',
    status: 'published',
    publishDate: new Date(),
    content: 'The Hidden Cost of Reactive vs. Proactive Property Maintenance\n\nYou own a rental property. The boiler works. The roof doesn\'t leak. The plumbing functions. So why spend money on maintenance you can\'t see?\n\nThat\'s the reactive mindset. And it costs thousands more than you think.\n\nProperty owners typically fall into two camps: those who fix things when they break, and those who prevent things from breaking. The difference in cost is staggering—often 3:1 or worse.',
  },
  {
    title: 'What Property Managers Need to Know About Compliance & Safety Standards',
    slug: 'compliance-safety-standards',
    excerpt: 'Essential guide to UK rental property compliance: gas safety, electrical inspections, damp prevention, and more.',
    category: 'maintenance',
    featuredImage: 'https://cdn.adaptservicesgroup.co.uk/blog/compliance-standards.jpg',
    metaDescription: 'UK rental property compliance guide: Gas safety, EICR, legionella, damp, fire safety. Penalties and deadlines.',
    readTime: 8,
    author: 'Human',
    status: 'published',
    publishDate: new Date(),
    content: 'What Property Managers Need to Know About Compliance & Safety Standards\n\nIf you manage rental properties in the UK, you\'re operating in one of the most heavily regulated sectors. Miss a deadline or overlook a requirement, and you\'re facing fines, legal action, and potential prosecution.\n\nThe problem? Compliance requirements are scattered across multiple acts, regulations, and standards. Most property managers don\'t know what they don\'t know until it\'s too late.',
  },
  {
    title: 'Emergency Response Case Study: How We Fixed a Catastrophic Leak in 90 Minutes',
    slug: 'emergency-response-leak-case-study',
    excerpt: 'Real case study: A midnight emergency call, a corroded pipe, and how quick response prevented £12,000+ in damage.',
    category: 'case-study',
    featuredImage: 'https://cdn.adaptservicesgroup.co.uk/blog/leak-case-study.jpg',
    metaDescription: 'Emergency response case study: 90-minute response prevented £12,000 in damage. Real example of fast, effective problem-solving.',
    readTime: 5,
    author: 'Human',
    status: 'published',
    publishDate: new Date(),
    content: 'Emergency Response Case Study: How We Fixed a Catastrophic Leak in 90 Minutes\n\nA property manager in Maidstone called us at 11:47 PM on a Tuesday night. His words: "Water is pouring from the ceiling. The tenant is panicking. I don\'t know what to do."\n\nThe property was a 3-bedroom semi-detached rental. The tenant had noticed water dripping from the upstairs ceiling around 11 PM. By the time the property manager arrived, the drip had become a stream. Water was pooling on the landing floor.',
  },
];

async function seedBlogPosts() {
  try {
    console.log('Initializing database...');
    await initializeDatabase();
    
    console.log('Starting blog post seeding...');
    
    for (const post of posts) {
      await db.insert(blogPosts).values({
        ...post,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✓ Seeded: ${post.title}`);
    }
    
    console.log('\n✅ All 4 blog posts seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error);
    process.exit(1);
  }
}

seedBlogPosts();
