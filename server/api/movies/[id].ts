import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event)
  const { id } = event.context.params as any

  const { data } = await supabase
    .from('movies')
    .select(`*,
      comments (
        *
      )`)
    .eq('id', id)
    .eq('is_shown', true)
    .single()

  return data
})
