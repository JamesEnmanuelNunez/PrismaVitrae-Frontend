import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bmaxljujekthtjgncvta.supabase.co'
const supabaseAnonKey = 'sb_publishable_YRj9N58xYX4kpe2Ryqy48w_4GAASg3b'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
