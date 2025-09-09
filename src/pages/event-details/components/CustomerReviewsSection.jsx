import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../../src/lib/firebase';

const CustomerReviewsSection = ({ eventId = 'global' }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'events', eventId, 'reviews'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    const unsub = onSnapshot(q, (snap) => {
      setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [eventId]);

  if (!reviews.length) {
    return <div className="p-6 text-muted-foreground">No reviews yet.</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map(r => (
        <div key={r.id} className="p-4 border rounded-lg bg-card">
          <div className="flex items-center space-x-3 mb-2">
            <img className="w-8 h-8 rounded-full border" src={r.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(r.name||'U')}`} />
            <div>
              <p className="font-medium">{r.name || 'Anonymous'}</p>
              <p className="text-xs text-muted-foreground">{new Date(r.createdAt?.toDate?.() || r.createdAt || Date.now()).toLocaleString()}</p>
            </div>
          </div>
          <p className="text-sm text-foreground">{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviewsSection;