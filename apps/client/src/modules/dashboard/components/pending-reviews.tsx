import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PendingReviewItem } from "./pending-review-item";
import type { PendingReviewItemData } from "./pending-review-item";

// Pasar prop después en lugar del mock aquí
const mockPendingReviews: PendingReviewItemData[] = [
  { id: '1', title: 'Introduce structured error envelope',       repo: 'atlas-api',   prNumber: 843, additions: 421, deletions: 88,  status: 'review',  url: '#', author: 'AN', authorAvatarUrl: 'https://i.pravatar.cc/32?u=an'  },
  { id: '2', title: 'Replace legacy modal with Drawer primitive', repo: 'pulse-web',  prNumber: 318, additions: 312, deletions: 204, status: 'review',  url: '#', author: 'PS', authorAvatarUrl: 'https://i.pravatar.cc/32?u=ps'  },
  { id: '3', title: 'Add PKCE flow for native clients',           repo: 'cypher-auth', prNumber: 77, additions: 178, deletions: 12, status: 'changes', url: '#', author: 'MH', authorAvatarUrl: 'https://i.pravatar.cc/32?u=mh'  },
];

export const PendingReviews = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Pending reviews</CardTitle>
          <CardDescription>PRs waiting for your attention</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col">
        {mockPendingReviews.map((item, index) => (
          <div key={item.id}>
            <PendingReviewItem {...item} />
            {index < mockPendingReviews.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
