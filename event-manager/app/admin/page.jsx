import Link from 'next/link';
import React from 'react';

function AdminPage() {
  return (
    <div className='container mx-auto px-4'>
      <h2 className="text-6xl font-bold text-center py-14">Event List</h2>
      <div className="flex flex-col space-y-8">
        <Link href="/admin/detail-event" className="p-6 rounded-lg border-2 shadow-lg cursor-pointer">
          <h3 className="text-xl font-bold">Event 1</h3>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="text-sm text-muted-foreground">Time</p>
        </Link>
        <Link href="/admin/detail-event" className=" p-6 rounded-lg border-2 shadow-lg cursor-pointer">
          <h3 className="text-xl font-bold">Event 2</h3>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="text-sm text-muted-foreground">Time</p>
        </Link>
        <Link href="/admin/detail-event" className=" p-6 rounded-lg border-2 shadow-lg cursor-pointer">
          <h3 className="text-xl font-bold">Event 3</h3>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="text-sm text-muted-foreground">Time</p>
        </Link>
      </div>
    </div>
  );
}
export default AdminPage