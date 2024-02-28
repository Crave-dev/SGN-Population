'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

function AppProvider(props: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    return <QueryClientProvider client={queryClient}>
        {props?.children}
    </QueryClientProvider>
}

export default AppProvider