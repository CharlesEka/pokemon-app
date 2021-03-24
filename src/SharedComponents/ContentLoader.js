import React from "react";
import { css, keyframes  } from '@emotion/css'
import styled from '@emotion/styled'

export default function ContentLoader({height}){
    const loading = keyframes`
        from{
            width: 0%
        }
        to{
            width: 100%;
        }
    `;

    const LoadingCard = styled.div`
        border-radius: 10px;
        position: relative;
        margin: 0px;
        background-color: whitesmoke;
    `;

    const LoadingBar = styled.div`
        height: ${height};
        background: linear-gradient(90deg, rgba(210,210,210,0.5) 0%, rgba(238,238,238,0.7) 100%);
        border-radius: 10px;
        animation: ${loading} 0.7s infinite;
    `;

    return (
        <div className={css`padding: 0; padding: 0.5rem;`+' col-xl-3 col-lg-4 col-sm-6 col-12'}>
            <LoadingCard>
                <LoadingBar></LoadingBar>
            </LoadingCard>
        </div>
    )
}