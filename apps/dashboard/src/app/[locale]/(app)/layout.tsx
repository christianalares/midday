import { createClient } from "@midday/supabase/server";

const conWarn = console.warn
const conLog = console.log

const IGNORE_WARNINGS = [
  'Using supabase.auth.getSession() is potentially insecure',
  'Using the user object as returned from supabase.auth.getSession()',
]

// biome-ignore lint/complexity/useArrowFunction: <explanation>
console.warn = function (...args) {
  const match = args.find((arg) =>
    typeof arg === 'string' ? IGNORE_WARNINGS.find((warning) => arg.includes(warning)) : false,
  )
  if (!match) {
    conWarn(...args)
  }
}

// biome-ignore lint/complexity/useArrowFunction: <explanation>
console.log = function (...args) {
  const match = args.find((arg) =>
    typeof arg === 'string' ? IGNORE_WARNINGS.find((warning) => arg.includes(warning)) : false,
  )
  if (!match) {
    conLog(...args)
  }
}

export default async function Layout({
  dashboard,
  login,
}: {
  dashboard: React.ReactNode;
  login: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return dashboard;
  }

  return login;
}
