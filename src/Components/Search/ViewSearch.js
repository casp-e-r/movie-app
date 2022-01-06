import React from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import Search from './Search'

function ViewSearch() {
    return (
        <div>
            <SkeletonTheme baseColor=' #1c1c1c' highlightColor='#212121'>

            <Search/>
            </SkeletonTheme>
        </div>
    )
}

export default ViewSearch
