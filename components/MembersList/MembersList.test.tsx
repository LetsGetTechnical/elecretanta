import { render, screen } from '@testing-library/react';
import { MembersList } from './MembersList';
import { GiftExchangeMember } from '@/app/types/giftExchangeMember';

const mockMembers: GiftExchangeMember[] = [
    {
        id: '1',
        gift_exchange_id: 'ge-1',
        user_id: 'user-01',
        recipient_id: null,
        has_drawn: false,
        member: {
          display_name: 'Example User',
          email: 'exampleuser@example.com',
          avatar: '/avatarimg.jpg',
        },
        recipient: {
          display_name: 'Another Example',
          email: 'anotherexample@example.com',
          avatar: '/avatarimg2.jpg',
        },
    }, 
    {
        id: '2',
        gift_exchange_id: 'ge-1',
        user_id: 'user-02',
        recipient_id: null,
        has_drawn: false,
        member: {
          display_name: 'Test User',
          email: 'testuser@example.com',
          avatar: '/avatarimg3.jpg',
        },
        recipient: {
          display_name: 'Testing Example',
          email: 'testingexample@example.com',
          avatar: '/avatarimg4.jpg',
        },
    },
]

describe('MembersList', () => {
    beforeEach(() => {
        render(<MembersList members={mockMembers}/>);
    });
    
    it('renders the component', () => {
        const membersList = screen.getByTestId('members-list');
        expect(membersList).toBeInTheDocument();
    });

    it('renders each member item passed into mockMembers array', () => {
        const memberItems = screen.getAllByTestId('member-item');
        expect(memberItems).toHaveLength(mockMembers.length);
    });

    it('renders member display name and email', () => {
        expect(screen.getByText('Example User')).toBeInTheDocument();
        expect(screen.getByText('exampleuser@example.com')).toBeInTheDocument();
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('testuser@example.com')).toBeInTheDocument();
    });

    it('properly links to a member profile after clicking avatar', () => {
        const links = screen.getAllByTestId('member-profile-link');
        mockMembers.forEach((member, index) => {
            expect(links[index]).toHaveAttribute('href', `/profile/${member.user_id}`)
        });
    });

    it('renders correct member count in header', () => {
        const memberListHeader = screen.getByTestId('member-list-header');
        const memberCount = mockMembers.length;
        expect(memberListHeader).toHaveTextContent(`Members (${memberCount})`);
    });
});