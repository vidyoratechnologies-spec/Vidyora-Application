import { Rss, Share2, Heart, MessageSquare, MoreHorizontal, Megaphone } from 'lucide-react';

export default function StudentFeed() {
  const posts = [
    { user: 'Tech Club', avatar: 'https://picsum.photos/seed/tech/100/100', content: 'Excited to announce the annual Hackathon! Registration starts tomorrow at 10 AM. 🚀 #VidyoraHack', likes: 124, comments: 18, time: '2h ago' },
    { user: 'Elena (ME)', avatar: 'https://picsum.photos/seed/elena/100/100', content: 'Does anyone have the notes for Thermodynamics Lecture 12? I missed it due to the clinic appointment.', likes: 8, comments: 24, time: '3h ago' },
    { user: 'Campus Life', avatar: 'https://picsum.photos/seed/campus/100/100', content: 'New menu items at the North Canteen are awesome! Highly recommend the paneer wrap. 🌯', likes: 210, comments: 42, time: '5h ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2 text-text-primary">Campus Feed</h2>
          <p className="text-text-secondary text-sm font-medium">Connect with your peers and stay updated with campus life.</p>
      </section>

      {/* Official Announcement Card */}
      <div className="bg-gradient-to-br from-brand/80 to-brand-accent/80 p-6 rounded-3xl border border-border-subtle shadow-xl relative overflow-hidden group">
         <Megaphone className="absolute -right-2 -bottom-2 opacity-10 rotate-12 group-hover:scale-110 transition-transform text-white" size={100} />
         <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-3">
             <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
             Official Announcement
         </div>
         <h3 className="text-lg font-bold text-white leading-tight">Holiday Notice: Autumn break starts from Oct 28th.</h3>
         <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Holiday Notice: Autumn break starts from Oct 28th.', content: 'The institution will remain closed from Oct 28th to Nov 4th for the autumn break. Regular classes will resume on Nov 5th.' }}))} className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold text-white transition-all">Read Full Circular</button>
      </div>

      {/* Feed List */}
      <div className="space-y-6 pb-20">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-bg-secondary rounded-3xl p-6 border border-border-subtle space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full border border-border-subtle" referrerPolicy="no-referrer" />
                    <div>
                        <h4 className="text-sm font-bold text-text-primary">{post.user}</h4>
                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{post.time}</p>
                    </div>
                </div>
                <MoreHorizontal onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Post Options', content: 'Report, mute, or copy link to this post.' }}))} size={18} className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors" />
            </div>
            <p className="text-sm text-text-primary/90 leading-relaxed">{post.content}</p>
            <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                <div className="flex items-center gap-6">
                    <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Like Post', content: 'You liked this post.' }}))} className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-red-500 transition-colors">
                        <Heart size={16} /> {post.likes}
                    </button>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Comments', content: 'Opening comment thread.' }}))} className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-brand transition-colors">
                        <MessageSquare size={16} /> {post.comments}
                    </button>
                </div>
                <Share2 onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Share Post', content: 'Sharing options opened.' }}))} size={16} className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
