# Fix: Notification Position (Always Visible - No Scroll)

## Problem
notifications.show() appears bottom-left (hidden behind long forms)

## Solution 1: Local Fix (DynamicForm.tsx)
```tsx
notifications.show({
  title: 'Success',
  message: 'Form submitted successfully!',
  color: 'green',
  position: 'top-right',  // TOP viewport (overrides global)
  autoClose: 3000,
});
```

## Solution 2: Global Fix (main.tsx)
Find `<Notifications />`, add:
```tsx
<Notifications position='top-right' />
```

## Solution 3: Devtools Conflict (if still bottom)
In src/routes/__root.tsx:
```tsx
<TanStackDevtools config={{position: 'bottom-left'}} />
```

## Test
1. Apply Solution 1 (simplest)
2. Submit form
3. ✅ Notification top-right, no scroll needed

**Recommended**: Solution 1 (scoped to forms)
