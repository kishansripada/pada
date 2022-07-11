import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mofbpdxaxkjlvywcbpmj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZmJwZHhheGtqbHZ5d2NicG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc0Nzk4NTIsImV4cCI6MTk3MzA1NTg1Mn0.vqgQC-YPAkdhrIHBIjMAs_xiD_a5Ai60VHSR_IEmlk4"
export const supabase = createClient(supabaseUrl, supabaseKey)