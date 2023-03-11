export function filterUsers(users, searchQuery) {
    if (!users) return users;
    
    searchQuery = searchQuery.toLowerCase();
    return users.filter(user => 
        user.name.toLowerCase().includes(searchQuery)
        || user.email.toLowerCase().includes(searchQuery)
        || user.jobTitle.toLowerCase().includes(searchQuery)
    );
}