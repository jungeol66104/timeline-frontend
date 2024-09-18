// // @ts-nocheck
// /* eslint-disable */
//
// private async change(method: HistoryMethod, url: string, as: string, options: TransitionOptions, forcedScroll?: { x: number; y: number }): Promise<boolean> {
//
//     // WARNING: `_h` is an internal option for handing Next.js client-side hydration. Your app should _never_ use this property. It may change at any time without notice.
//     const isQueryUpdating = (options as any)._h === 1
//
//     if (!isQueryUpdating && !options.shallow) {
//         await this._bfl(as, undefined, options.locale)
//     }
//
//     let shouldResolveHref = isQueryUpdating || (options as any)._shouldResolveHref || parsePath(url).pathname === parsePath(as).pathname
//
//     const nextState = {...this.state,}
//
//     // for static pages with query params in the URL we delay marking the router ready until after the query is updated or a navigation has occurred
//     const readyStateChange = this.isReady !== true
//     this.isReady = true
//     const isSsr = this.isSsr
//
//     if (!isQueryUpdating) this.isSsr = false
//
//     // if a route transition is already in progress before the query updating is triggered ignore query updating
//     if (isQueryUpdating && this.clc) return false
//
//     // marking route changes as a navigation start entry
//     if (ST) performance.mark('routeChange')
//
//     const { shallow = false, scroll = true } = options
//     const routeProps = { shallow }
//
//     as = addBasePath(addLocale(hasBasePath(as) ? removeBasePath(as) : as, options.locale, this.defaultLocale))
//     const cleanedAs = removeLocale(hasBasePath(as) ? removeBasePath(as) : as, nextState.locale)
//     this._inFlightRoute = as
//     const localeChange = prevLocale !== nextState.locale
//
//     let parsed = parseRelativeUrl(url)
//     let { pathname, query } = parsed
//
//     // The build manifest needs to be loaded before auto-static dynamic pages get their query parameters to allow ensuring they can be parsed properly when rewritten to
//     let pages: string[], rewrites: any
//     ;[pages, { __rewrites: rewrites }] = await Promise.all([this.pageLoader.getPageList(), getClientBuildManifest(), this.pageLoader.getMiddleware(),])
//
//     // If asked to change the current URL we should reload the current page
//     // (not location.reload() but reload getInitialProps and other Next.js stuffs)
//     // We also need to set the method = replaceState always
//     // as this should not go into the history (That's how browsers work)
//     // We should compare the new asPath to the current asPath, not the url
//     if (!this.urlIsNew(cleanedAs) && !localeChange) method = 'replaceState'
//
//     // we need to resolve the as value using rewrites for dynamic SSG
//     // pages to allow building the data URL correctly
//     let resolvedAs = as
//
//     // url and as should always be prefixed with basePath by this point by either next/link or router.push/replace so strip the basePath from the pathname to match the pages dir 1-to-1
//     pathname = pathname ? removeTrailingSlash(removeBasePath(pathname)) : pathname
//
//     let route = removeTrailingSlash(pathname)
//     const parsedAsPathname = as.startsWith('/') && parseRelativeUrl(as).pathname
//
//     const isMiddlewareRewrite = !!(parsedAsPathname && route !== parsedAsPathname && (!isDynamicRoute(route) || !getRouteMatcher(getRouteRegex(route))(parsedAsPathname)))
//
//     // we don't attempt resolve asPath when we need to execute
//     // middleware as the resolving will occur server-side
//     const isMiddlewareMatch = !options.shallow && (await matchesMiddleware({asPath: as, locale: nextState.locale, router: this,}))
//     if (isQueryUpdating && isMiddlewareMatch) shouldResolveHref = false
//
//     if (shouldResolveHref && pathname !== '/_error') {
//         ;(options as any)._shouldResolveHref = true
//
//         if (process.env.__NEXT_HAS_REWRITES && as.startsWith('/')) {
//             const rewritesResult = resolveRewrites(addBasePath(addLocale(cleanedAs, nextState.locale), true), pages, rewrites, query, (p: string) => resolveDynamicRoute(p, pages), this.locales)
//
//             if (rewritesResult.externalDest) {
//                 handleHardNavigation({ url: as, router: this })
//                 return true
//             }
//             if (!isMiddlewareMatch) resolvedAs = rewritesResult.asPath
//
//             if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
//                 // if this directly matches a page we need to update the href to allow the correct page chunk to be loaded
//                 pathname = rewritesResult.resolvedHref
//                 parsed.pathname = addBasePath(pathname)
//
//                 if (!isMiddlewareMatch) url = formatWithValidation(parsed)
//             }
//         } else {
//             parsed.pathname = resolveDynamicRoute(pathname, pages)
//
//             if (parsed.pathname !== pathname) {
//                 pathname = parsed.pathname
//                 parsed.pathname = addBasePath(pathname)
//
//                 if (!isMiddlewareMatch) url = formatWithValidation(parsed)
//             }
//         }
//     }
//
//     resolvedAs = removeLocale(removeBasePath(resolvedAs), nextState.locale)
//
//     route = removeTrailingSlash(pathname)
//     let routeMatch: Params | false = false
//
//     if (isDynamicRoute(route)) {
//         const parsedAs = parseRelativeUrl(resolvedAs)
//         const asPathname = parsedAs.pathname
//
//         const routeRegex = getRouteRegex(route)
//         routeMatch = getRouteMatcher(routeRegex)(asPathname)
//         const shouldInterpolate = route === asPathname
//         const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : ({} as { result: undefined; params: undefined })
//
//         if (!routeMatch || (shouldInterpolate && !interpolatedAs.result)) {
//             const missingParams = Object.keys(routeRegex.groups).filter((param) => !query[param] && !routeRegex.groups[param].optional)
//
//             if (missingParams.length > 0 && !isMiddlewareMatch) {
//                 if (process.env.NODE_ENV !== 'production') console.warn(`${shouldInterpolate ? `Interpolating href` : `Mismatching \`as\` and \`href\``} failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``)
//                 throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`)
//             }
//         }
//         else if (shouldInterpolate) as = formatWithValidation(Object.assign({}, parsedAs, {pathname: interpolatedAs.result, query: omit(query, interpolatedAs.params!),}))
//         else Object.assign(query, routeMatch)
//     }
//
//     if (!isQueryUpdating) Router.events.emit('routeChangeStart', as, routeProps)
//
//     try {
//         let routeInfo = await this.getRouteInfo({route, pathname, query, as, resolvedAs, routeProps, locale: nextState.locale, isPreview: nextState.isPreview, hasMiddleware: isMiddlewareMatch, unstable_skipClientCache: options.unstable_skipClientCache, isQueryUpdating: isQueryUpdating && !this.isFallback, isMiddlewareRewrite,})
//
//         if (!isQueryUpdating && !options.shallow) await this._bfl(as, 'resolvedAs' in routeInfo ? routeInfo.resolvedAs : undefined, nextState.locale)
//
//         if ('route' in routeInfo && isMiddlewareMatch) {
//             pathname = routeInfo.route || route
//             route = pathname
//
//             if (!routeProps.shallow) query = Object.assign({}, routeInfo.query || {}, query)
//
//             const cleanedParsedPathname = hasBasePath(parsed.pathname) ? removeBasePath(parsed.pathname) : parsed.pathname
//
//             if (routeMatch && pathname !== cleanedParsedPathname) Object.keys(routeMatch).forEach((key) => {if (routeMatch && query[key] === routeMatch[key]) delete query[key]})
//
//             if (isDynamicRoute(pathname)) {
//                 const prefixedAs = !routeProps.shallow && routeInfo.resolvedAs ? routeInfo.resolvedAs : addBasePath(addLocale(new URL(as, location.href).pathname, nextState.locale), true)
//                 let rewriteAs = prefixedAs
//
//                 if (hasBasePath(rewriteAs)) rewriteAs = removeBasePath(rewriteAs)
//
//                 const routeRegex = getRouteRegex(pathname)
//                 const curRouteMatch = getRouteMatcher(routeRegex)(new URL(rewriteAs, location.href).pathname)
//
//                 if (curRouteMatch) Object.assign(query, curRouteMatch)
//             }
//         }
//
//         const component: any = routeInfo.Component
//         if (component && component.unstable_scriptLoader) {
//             const scripts = [].concat(component.unstable_scriptLoader())
//             scripts.forEach((script: any) => {handleClientScriptLoad(script.props)})
//         }
//
//         // shallow routing is only allowed for same page URL changes.
//         const isValidShallowRoute = options.shallow && nextState.route === (routeInfo.route ?? route)
//         const shouldScroll = options.scroll ?? (!isQueryUpdating && !isValidShallowRoute)
//         const resetScroll = shouldScroll ? { x: 0, y: 0 } : null
//         const upcomingScrollState = forcedScroll ?? resetScroll
//
//         // the new state that the router gonna set
//         const upcomingRouterState = {...nextState, route, pathname, query, asPath: cleanedAs, isFallback: false,}
//
//         Router.events.emit('beforeHistoryChange', as, routeProps)
//         this.changeState(method, url, as, options)
//
//         // for query updates we can skip it if the state is unchanged and we don't need to scroll
//         const canSkipUpdating = isQueryUpdating && !upcomingScrollState && !readyStateChange && !localeChange && compareRouterStates(upcomingRouterState, this.state)
//         if (!canSkipUpdating) {
//             await this.set(upcomingRouterState, routeInfo, upcomingScrollState)
//             if (!isQueryUpdating) {Router.events.emit('routeChangeComplete', as, routeProps)}
//         }
//         return true
//     }
// }
//
// private set(state: typeof this.state, data: PrivateRouteInfo, resetScroll: { x: number; y: number } | null): Promise<void> {
//     this.state = state
//
//     return this.sub(data, this.components['/_app'].Component as AppComponent, resetScroll)
// }
