import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vtnwmqapvjzbjqctnyeo.supabase.co';
const supabaseKey = 'sb_publishable_dsRiQWHoGG0DWFXRS2g4mA_kPqcsn2A';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
