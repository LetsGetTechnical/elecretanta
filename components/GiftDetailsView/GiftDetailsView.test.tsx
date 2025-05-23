// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { render, screen } from '@testing-library/react';
import GiftDetailsView from './GiftDetailsView';
import { describe } from 'node:test';
import { userEvent } from '@storybook/test';

const mockGift = {
  id: '1',
  title: 'Blanket',
  price: '$29.99',
  description: 'fuzzy blanket',
  matchReasons: ['fits theme', 'highly rated'],
  matchScore: 0.98,
  imageUrl:
    'https://www.amazon.com/Cozzenity-Checkered-Blanket-Blankets-Lightweight/dp/B0F13991KJ/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.6wzR8Y2VhlZ6NsPFYW2cadhZFdeTIN7H6f_K3SufPMLJMToDPu0O_vCflzFycFVgQu9w8Xa2yC56dPFThjqnH5R3cM6i--ozxTqrjiTRLFj0OR_jh8wRe9Y0992_NPU9HrrjbKFeAWsFHKCcDxcGytcREvh7r2XZf-F-jcpqtBJFNhezM0lAhCO27_HYTgtb21GKie4DnzAWwESS488BC_7hi7FVKkDLJRJSmBIBro0WxlgebmNyTq6QqPcwQpM-o2Xa9hLm7DvYG0QSsRcR9QhK0aiRkQs6wLSW0YJHQBI.GiOlWv46xAPaV98XHUz3LzGTnXgnhW8lH6oq09Rz7Jk&dib_tag=se&hvadid=694526290027&hvdev=c&hvexpln=67&hvlocphy=9031568&hvnetw=g&hvocijid=18272751582845398260--&hvqmt=e&hvrand=18272751582845398260&hvtargid=kwd-460419430462&hydadcr=19233_13355042&keywords=amazon%2Bfuzzy%2Bblanket&mcid=5b4485e6f4883f9f84c099bcd937f120&qid=1747259407&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
};

const mockBadGift = {
  id: '1',
  title: 'Blanket',
  price: '$29.99',
  description: 'fuzzy blanket',
  matchReasons: ['fits theme', 'highly rated'],
  matchScore: 0.98,
  imageUrl:'bad_url',
}


const mockHandleFeedback = jest.fn();

describe('GiftDetailsView', () => {
  //testing the gift and handleFeedback props
  it('renders the component with correct props', () => {
    render(
      <GiftDetailsView gift={mockGift} handleFeedback={mockHandleFeedback} />,
    );
  });

  //testing the Amazon URL
  it('generates the correct Amazon URL', async () => {
    render(
      <GiftDetailsView gift={mockGift} handleFeedback={mockHandleFeedback} />,
    );

    const hrefLink = screen.getByRole('link', { name: /view/i });
    await userEvent.click(hrefLink);

    expect(hrefLink).toHaveAttribute(
      'href',
      'https://www.amazon.com/s?k=Blanket',
    );

  })

  // testing conditional rendering for ImageURL
  it('renders image if URL is present', () => {
    render(
      <GiftDetailsView gift={mockGift} handleFeedback={mockHandleFeedback} />,
    );

    const image = screen.getByTestId('valid-image');
    expect(image).toBeInTheDocument();
  })

  //testing that Gift Icon appears if not valid image URL
  //CAN NOT FIGURE THIS OUT
  it('renders Gift Icon if URl is not valid', ()=> {
     render(
       <GiftDetailsView gift={mockBadGift} handleFeedback={mockHandleFeedback} />,
     );

     const giftIcon = screen.getByTestId('gift-icon');
     expect(giftIcon).toBeInTheDocument();
  })

  it('renders a valid MatchScore and price', () => {
    render(
      <GiftDetailsView gift={mockGift} handleFeedback={mockHandleFeedback} />,
    );

    const matchScore = screen.getByTestId('valid-matchScore');
    expect(matchScore).toBeInTheDocument();

    const price = screen.getByTestId('valid-price');
    expect(price).toBeInTheDocument();
  })

  it('renders a valid title and description', () => {
    render(
      <GiftDetailsView gift={mockGift} handleFeedback={mockHandleFeedback} />,
    );

    const title = screen.getByTestId('valid-title');
    expect(title).toBeInTheDocument();

    const description = screen.getByTestId('valid-description');
    expect(description).toBeInTheDocument();
  });

  it('correctly renders a list for match reasons', () => {
    render(
      <GiftDetailsView gift={mockGift} handleFeedback={mockHandleFeedback} />,
    );

    mockGift.matchReasons.forEach((reason) => {
      expect(screen.getByText(reason)).toBeInTheDocument();
    })
  })

});
