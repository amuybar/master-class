import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv'

// // Load environment variables
// dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SERVICE_ROLE

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const seedProjects = async (num) => {
  const projects = [];
  
  for (let i = 0; i < num; i++) {
    const name = faker.lorem.words(3);
    projects.push({ 
      name,
      slug: faker.helpers.slugify(name),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5], { min: 1, max: 3 })
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects).select()
  if (error) throw error
  return data
}

const seedTasks = async (num, projectIds) => {
  const tasks = [];
  
  for (let i = 0; i < num; i++) {
    const name = faker.lorem.words(3);
    tasks.push({ 
      name,
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5], { min: 1, max: 3 })
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select()
  if (error) throw error
  return data
}

const seedDatabase = async (num) => {
  try {
    const projects = await seedProjects(num)
    if (!projects || !projects.length) throw new Error('Failed to create projects')
    
    const projectIds = projects.map(project => project.id)
    await seedTasks(num * 2, projectIds) // Creating more tasks than projects
    
    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase(20)