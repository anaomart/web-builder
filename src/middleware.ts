import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
    publicRoutes: ['/site', '/api/uploadthing'],
    async beforeAuth(auth,req){},
    async afterAuth(auth,req){
      const url = req.nextUrl
      const searchParams = url.searchParams.toString()
      let hostname = req.headers
      const pathWithSearchParams = `${url.pathname}${
        searchParams.length > 0 ? `?${searchParams}` : ''
      }`

      

      const CutomSubDomain = hostname.get('host')?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)?.filter(Boolean)[0]
      console.log(hostname.get('host'))
      console.log({CutomSubDomain})
      if(CutomSubDomain){
        console.log("custom domain")
        return NextResponse.rewrite(new URL(`/${CutomSubDomain}${pathWithSearchParams}`,req.url))
      }

      if(url.pathname === '/sign-in' || url.pathname === '/sign-up'){
        return NextResponse.redirect(new URL('/agency/sign-in',req.url))
      }

      if(url.pathname === '/' || url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN){
        console.log('site')
        return NextResponse.rewrite(new URL('/site',req.url))
      }

      
      if (
        url.pathname.startsWith('/agency') ||
        url.pathname.startsWith('/subaccount')
      ) {
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
      }

      console.log({url,searchParams,hostname,pathWithSearchParams,CutomSubDomain})
    
    
    
    
    },

  })

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};