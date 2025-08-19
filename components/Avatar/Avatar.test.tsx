// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import Avatar from "./Avatar";
import { render, screen } from '@testing-library/react';
import React from "react";

jest.mock('./AvatarImage', () => ({
    AvatarImage: ({ src, alt }: { src: string; alt: string}) => (
        <img src={src} alt={alt} data-testid="avatar-image-mock" />
    )
}));

jest.mock('./AvatarFallback/AvatarFallback', () => ({
    AvatarFallback : ({ children } : { children: React.ReactNode }) => (
        <div data-testid="avatar-fallback-mock">{children}</div>
    )
}));

jest.mock('./AvatarBody/AvatarBody', () => ({
    AvatarBody: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="avatar-body-mock">{children}</div>
    )
}));

describe('Avatar Component', () => {
    it('should render user avatar image when a URL is provided', () => {
        const userAvatarUrl = 'https://avatar.iran.liara.run/public/girl?username=Maria';
        render(<Avatar userAvatar={userAvatarUrl} />);

        const userImage = screen.getByAltText('user avatar');
        expect(userImage).toBeInTheDocument();
        expect(userImage).toHaveAttribute('src', userAvatarUrl);

        const fallbackComponent = screen.queryByTestId('avatar-fallback-mock');
        expect(fallbackComponent).not.toBeInTheDocument();
    });

    it('should render fallback when no URL is provided', () => {
        render(<Avatar userAvatar={undefined} />);

        const userImage = screen.queryByAltText('user avatar');
        expect(userImage).not.toBeInTheDocument();

        const fallbackImage = screen.getByAltText('default avatar');
        expect(fallbackImage).toBeInTheDocument();
    })
})