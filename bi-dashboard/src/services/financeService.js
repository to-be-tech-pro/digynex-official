import { supabase } from './supabase'

export const fetchFinanceLedger = async () => {
    try {
        const { data, error } = await supabase
            .from('bi_transactions')
            .select('*')
            .order('transaction_date', { ascending: false });

        if (error) throw error;

        // Map database fields to UI ledger format
        return data.map(t => ({
            id: t.id.split('-')[0].toUpperCase(), // Short ID for display
            desc: t.description || t.category.replace('_', ' ').toUpperCase(),
            cat: t.category.replace('_', ' ').toUpperCase(),
            val: Number(t.amount).toLocaleString(),
            date: new Date(t.transaction_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            type: t.type === 'revenue' ? 'In' : 'Out'
        }));
    } catch (error) {
        console.error("Finance Fetch Error:", error);
        return [];
    }
}

export const fetchFinancialSummary = async () => {
    try {
         const { data, error } = await supabase
            .from('bi_transactions')
            .select('amount, type');

        if (error) throw error;

        let totalRevenue = 0;
        let totalExpense = 0;

        data.forEach(t => {
            if (t.type === 'revenue') totalRevenue += Number(t.amount);
            else totalExpense += Number(t.amount);
        });

        return {
            revenue: totalRevenue,
            expense: totalExpense,
            profit: totalRevenue - totalExpense,
            margin: totalRevenue > 0 ? ((totalRevenue - totalExpense) / totalRevenue * 100).toFixed(1) : 0
        };
    } catch (error) {
        console.error("Summary Fetch Error:", error);
        return { revenue: 0, expense: 0, profit: 0, margin: 0 };
    }
}
